# 🔵 System Architecture - Zero-Trust Identity Agent

**Project:** Zero-Trust Identity Agent  
**Version:** 1.0 MVP  
**Architecture Style:** Event-Driven Multi-Agent System

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Event Generator / Simulator                  │
│              (Synthetic CloudTrail-like events)                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │   NATS Broker  │
                    │   (Pub/Sub)    │
                    └────────┬───────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│    Agent 1      │ │    Agent 2      │ │    Agent 3      │
│   Behavioral    │ │ Authentication  │ │   Privilege     │
│    Baseline     │ │    Context      │ │   Management    │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Shared State  │
                    │ (JSON files +  │
                    │  in-memory)    │
                    └────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Audit Trail   │
                    │  (JSON logs)   │
                    └────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  CLI Output    │
                    │ (Rich console) │
                    └────────────────┘
```

---

## Component Architecture

### 1. Event Generator / Simulator

**Purpose:** Generate synthetic security events that mimic AWS CloudTrail, IAM, and SSO events

**Responsibilities:**
- Generate baseline user behavior patterns
- Simulate attack scenarios
- Produce legitimate unusual access patterns
- Emit events to NATS topics

**Event Types:**
```python
- events.auth.login
- events.auth.logout
- events.api.call
- events.privilege.request
```

**Key Classes:**
- `EventGenerator`: Base event creation
- `UserProfile`: User behavior templates
- `AttackSimulator`: Attack scenario orchestration

---

### 2. NATS Message Broker

**Purpose:** Lightweight pub/sub messaging for agent communication

**Topics:**
```
events.auth.*          # Authentication events
events.api.*           # API call events
events.privilege.*     # Privilege requests
risk.behavioral        # Agent 1 risk scores
risk.authentication    # Agent 2 risk scores
decisions.auth         # Auth allow/deny/step-up
decisions.privilege    # Privilege approve/deny/escalate
audit.*                # Audit trail events
```

**Configuration:**
- Local Docker container
- Port: 4222 (client), 8222 (monitoring)
- No authentication for local demo

---

### 3. Agent 1 - Behavioral Baseline Agent

**Purpose:** Build user behavioral profiles and detect anomalies

**Input Events:**
- `events.auth.login`
- `events.api.call`

**Output Events:**
- `risk.behavioral` (risk score updates)

**State Management:**
```python
user_profiles = {
    "user_id": {
        "login_times": [hour_of_day],
        "locations": [lat, lon],
        "resources_accessed": [resource_ids],
        "api_patterns": {api_name: frequency},
        "baseline_stats": {
            "avg_login_hour": float,
            "std_login_hour": float,
            "common_locations": [(lat, lon)],
            "common_resources": [resource_ids]
        }
    }
}
```

**Anomaly Detection Logic:**
```python
# Z-score for login time
z_score = (current_hour - avg_hour) / std_hour
time_risk = min(100, abs(z_score) * 20)

# Location deviation
location_risk = 0 if location in common_locations else 50

# Resource access novelty
resource_risk = 0 if resource in common_resources else 40

# Combined behavioral risk
behavioral_risk = weighted_average([time_risk, location_risk, resource_risk])
```

**Key Classes:**
- `BehavioralAgent`: Main agent orchestrator
- `UserProfileManager`: Profile storage and retrieval
- `AnomalyDetector`: Statistical analysis
- `RiskScorer`: Risk calculation

---

### 4. Agent 2 - Authentication Context Agent

**Purpose:** Analyze authentication attempts with contextual signals

**Input Events:**
- `events.auth.login`
- `risk.behavioral` (from Agent 1)

**Output Events:**
- `risk.authentication` (context risk scores)
- `decisions.auth` (allow/deny/step-up)

**Context Signals:**
```python
context_analysis = {
    "ip_reputation": check_ip_reputation(ip),
    "geolocation": get_geolocation(ip),
    "impossible_travel": detect_impossible_travel(user, location, time),
    "time_of_day_risk": calculate_time_risk(hour),
    "device_fingerprint": check_device(fingerprint)
}
```

**Decision Logic:**
```python
# Combine context risk + behavioral risk
context_risk = calculate_context_risk(signals)
behavioral_risk = get_latest_behavioral_risk(user_id)
combined_risk = (context_risk * 0.6) + (behavioral_risk * 0.4)

# Make decision
if combined_risk < 40:
    decision = "ALLOW"
elif combined_risk < 70:
    decision = "STEP_UP_MFA"
else:
    decision = "BLOCK"
```

**Key Classes:**
- `AuthenticationAgent`: Main agent orchestrator
- `ContextAnalyzer`: Signal collection and analysis
- `ImpossibleTravelDetector`: Geographic anomaly detection
- `AuthDecisionEngine`: Decision logic

---

### 5. Agent 3 - Smart Privilege Agent

**Purpose:** Make intelligent privilege escalation decisions

**Input Events:**
- `events.privilege.request`
- `risk.behavioral` (from Agent 1)
- `risk.authentication` (from Agent 2)

**Output Events:**
- `decisions.privilege` (approve/deny/escalate)

**Decision Logic:**
```python
# Gather risk context
behavioral_risk = get_latest_behavioral_risk(user_id)
auth_risk = get_latest_auth_risk(user_id)
combined_risk = (behavioral_risk * 0.5) + (auth_risk * 0.5)

# Make privilege decision
if combined_risk < 35:
    decision = "AUTO_APPROVE"
    credential_lifetime = 4 * 3600  # 4 hours
elif combined_risk < 75:
    decision = "ESCALATE_HUMAN"
    credential_lifetime = None
else:
    decision = "AUTO_DENY"
    credential_lifetime = None
```

**Key Classes:**
- `PrivilegeAgent`: Main agent orchestrator
- `RiskAggregator`: Combine risk scores from other agents
- `PrivilegeDecisionEngine`: Decision logic
- `CredentialManager`: Simulated temporary credential issuance

---

## Data Models

### Event Schema

```python
@dataclass
class SecurityEvent:
    event_id: str
    event_type: str  # "auth.login", "api.call", "privilege.request"
    timestamp: datetime
    user_id: str
    source_ip: str
    geolocation: dict  # {"lat": float, "lon": float, "country": str}
    metadata: dict  # Event-specific data

@dataclass
class AuthenticationEvent(SecurityEvent):
    device_fingerprint: str
    user_agent: str
    success: bool

@dataclass
class PrivilegeRequest(SecurityEvent):
    requested_privilege: str
    target_resource: str
    requested_duration: int  # seconds
```

### Risk Score Schema

```python
@dataclass
class RiskScore:
    user_id: str
    timestamp: datetime
    risk_value: float  # 0-100
    risk_factors: dict  # {"factor_name": contribution}
    agent_id: str  # "agent1", "agent2", "agent3"
```

### Decision Schema

```python
@dataclass
class Decision:
    decision_id: str
    timestamp: datetime
    user_id: str
    decision_type: str  # "auth", "privilege"
    decision: str  # "ALLOW", "DENY", "STEP_UP", "ESCALATE", "APPROVE"
    risk_score: float
    reasoning: list[str]  # Human-readable reasons
    agent_id: str
```

---

## State Management

### User Profile Storage

**Format:** JSON files in `data/profiles/`

```json
{
  "user_id": "dev001",
  "baseline": {
    "login_hours": {"mean": 10.5, "std": 2.3},
    "locations": [{"lat": 42.36, "lon": -71.06, "city": "Boston"}],
    "resources": ["db-prod-01", "api-gateway-01"],
    "api_patterns": {"ListBuckets": 50, "GetObject": 200}
  },
  "history": {
    "last_login": "2024-01-15T10:30:00Z",
    "last_location": {"lat": 42.36, "lon": -71.06},
    "total_logins": 150
  }
}
```

### Risk Score Cache

**Format:** In-memory dictionary with TTL

```python
risk_cache = {
    "user_id": {
        "behavioral": {"score": 25, "timestamp": datetime, "ttl": 300},
        "authentication": {"score": 15, "timestamp": datetime, "ttl": 300}
    }
}
```

---

## Deployment Architecture

### Local Development Setup

```yaml
# docker-compose.yml
version: '3.8'
services:
  nats:
    image: nats:latest
    ports:
      - "4222:4222"  # Client connections
      - "8222:8222"  # HTTP monitoring
    command: ["-js"]  # Enable JetStream
```

### Directory Structure

```
zero-trust-agent/
├── agents/
│   ├── agent1_behavioral.py
│   ├── agent2_authentication.py
│   ├── agent3_privilege.py
│   └── base_agent.py
├── simulator/
│   ├── event_generator.py
│   ├── attack_scenarios.py
│   └── user_profiles.py
├── models/
│   ├── events.py
│   ├── decisions.py
│   └── risk.py
├── utils/
│   ├── nats_client.py
│   ├── state_manager.py
│   └── logger.py
├── data/
│   ├── profiles/
│   ├── audit/
│   └── config/
├── tests/
│   └── test_scenarios.py
├── docker-compose.yml
├── requirements.txt
├── config.yaml
└── main.py
```

---

## Communication Patterns

### Pattern 1: Event Broadcasting

```
Simulator → NATS(events.auth.login) → [Agent1, Agent2] (subscribers)
```

### Pattern 2: Risk Score Publishing

```
Agent1 → NATS(risk.behavioral) → Agent3 (subscriber)
Agent2 → NATS(risk.authentication) → Agent3 (subscriber)
```

### Pattern 3: Decision Publishing

```
Agent2 → NATS(decisions.auth) → Audit Logger
Agent3 → NATS(decisions.privilege) → Audit Logger
```

---

## Security Considerations

### Local Demo Security
- No authentication required for NATS (local only)
- No encryption for messages (local only)
- Simulated credentials (no real AWS credentials)

### Production Considerations (Future)
- NATS authentication with tokens
- TLS encryption for all messages
- Secure credential storage
- Rate limiting and DoS protection

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Event Processing Latency | < 100ms | Event received → Risk score calculated |
| Decision Latency | < 5 seconds | Event received → Decision made |
| Throughput | 100 events/sec | Sustained load |
| Agent Startup Time | < 5 seconds | Process start → Ready to receive |

---

## Monitoring & Observability

### Metrics to Track
- Events processed per agent
- Average risk scores
- Decision distribution (allow/deny/escalate)
- Processing latency per agent
- False positive/negative rates

### Logging Strategy
- Structured JSON logs
- Log levels: DEBUG, INFO, WARNING, ERROR
- Separate audit trail from operational logs

---

## Next Steps

1. ✅ Architecture design complete
2. 🔄 Create detailed implementation plan
3. 🔄 Set up project structure
4. 🔄 Implement base agent framework
5. 🔄 Implement NATS communication layer
6. 🔄 Implement each agent
7. 🔄 Implement simulator
8. 🔄 Create attack scenarios
9. 🔄 Test and validate

---

**Document Status:** ✅ Approved  
**Last Updated:** 2024  
**Next Review:** Before implementation begins
