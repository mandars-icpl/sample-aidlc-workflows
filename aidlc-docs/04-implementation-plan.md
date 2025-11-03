# 🟢 CONSTRUCTION PHASE - Implementation Plan

**Project:** Zero-Trust Identity Agent  
**Timeline:** 30 hours total  
**Phase:** Construction (Implementation)

---

## Time Budget Breakdown

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Setup & Infrastructure** | 2 hours | Project structure, Docker, NATS, dependencies |
| **Core Framework** | 3 hours | Base agent, NATS client, data models |
| **Agent 1 (Behavioral)** | 4 hours | Profile management, anomaly detection, risk scoring |
| **Agent 2 (Authentication)** | 4 hours | Context analysis, impossible travel, auth decisions |
| **Agent 3 (Privilege)** | 3 hours | Risk aggregation, privilege decisions |
| **Event Simulator** | 4 hours | Event generation, user profiles, attack scenarios |
| **Integration & Testing** | 6 hours | E2E scenarios, bug fixes, refinement |
| **Demo Preparation** | 3 hours | CLI polish, documentation, demo script |
| **Buffer** | 1 hour | Unexpected issues |
| **TOTAL** | **30 hours** | |

---

## Implementation Sequence

### Phase 1: Foundation (2 hours)

#### Task 1.1: Project Setup (30 min)
```bash
# Create project structure
mkdir -p zero-trust-agent/{agents,simulator,models,utils,data/{profiles,audit,config},tests}
cd zero-trust-agent
python -m venv venv
source venv/bin/activate
```

**Deliverable:** Project directory structure

#### Task 1.2: Dependencies (15 min)
Create `requirements.txt`:
```
nats-py==2.6.0
pydantic==2.5.0
rich==13.7.0
faker==22.0.0
pyyaml==6.0.1
```

**Deliverable:** `requirements.txt`, installed dependencies

#### Task 1.3: Docker Setup (30 min)
Create `docker-compose.yml` for NATS

**Deliverable:** Running NATS broker

#### Task 1.4: Configuration (15 min)
Create `config.yaml` with thresholds, topics, settings

**Deliverable:** `config.yaml`

---

### Phase 2: Core Framework (3 hours)

#### Task 2.1: Data Models (45 min)
**File:** `models/events.py`
- `SecurityEvent` base class
- `AuthenticationEvent`
- `APICallEvent`
- `PrivilegeRequest`

**File:** `models/risk.py`
- `RiskScore`
- `RiskFactor`

**File:** `models/decisions.py`
- `Decision`
- `AuthDecision`
- `PrivilegeDecision`

**Deliverable:** Complete data models with Pydantic validation

#### Task 2.2: NATS Client Wrapper (45 min)
**File:** `utils/nats_client.py`
- `NATSClient` class
- `publish()` method
- `subscribe()` method
- Connection management
- Error handling

**Deliverable:** Reusable NATS client

#### Task 2.3: State Manager (30 min)
**File:** `utils/state_manager.py`
- `StateManager` class
- JSON file persistence
- In-memory caching
- TTL support

**Deliverable:** State management utility

#### Task 2.4: Base Agent Framework (60 min)
**File:** `agents/base_agent.py`
- `BaseAgent` abstract class
- Event subscription setup
- Message handling loop
- Logging integration
- Graceful shutdown

**Deliverable:** Base agent that other agents inherit from

---

### Phase 3: Agent 1 - Behavioral Baseline (4 hours)

#### Task 3.1: User Profile Manager (90 min)
**File:** `agents/agent1_behavioral.py` (ProfileManager class)
- Load/save user profiles
- Update baseline statistics
- Calculate moving averages
- Track login times, locations, resources

**Deliverable:** Profile management logic

#### Task 3.2: Anomaly Detection (90 min)
**File:** `agents/agent1_behavioral.py` (AnomalyDetector class)
- Z-score calculation for login times
- Location deviation detection
- Resource access novelty detection
- API pattern analysis

**Deliverable:** Statistical anomaly detection

#### Task 3.3: Risk Scoring (45 min)
**File:** `agents/agent1_behavioral.py` (RiskScorer class)
- Weighted risk calculation
- Risk factor breakdown
- Risk score normalization (0-100)

**Deliverable:** Behavioral risk scoring

#### Task 3.4: Agent Integration (45 min)
- Wire up event subscriptions
- Publish risk scores to NATS
- Add logging and error handling
- Test with sample events

**Deliverable:** Fully functional Agent 1

---

### Phase 4: Agent 2 - Authentication Context (4 hours)

#### Task 4.1: Context Analyzer (90 min)
**File:** `agents/agent2_authentication.py` (ContextAnalyzer class)
- IP reputation checking (simple good/bad lists)
- Geolocation lookup (IP to lat/lon)
- Time-of-day risk calculation
- Device fingerprint validation

**Deliverable:** Context signal collection

#### Task 4.2: Impossible Travel Detector (60 min)
**File:** `agents/agent2_authentication.py` (ImpossibleTravelDetector class)
- Calculate distance between locations
- Calculate time between logins
- Detect physically impossible travel
- Flag suspicious patterns

**Deliverable:** Impossible travel detection

#### Task 4.3: Auth Decision Engine (60 min)
**File:** `agents/agent2_authentication.py` (AuthDecisionEngine class)
- Combine context risk + behavioral risk
- Apply decision thresholds
- Generate decisions (ALLOW/STEP_UP/BLOCK)
- Create decision reasoning

**Deliverable:** Authentication decision logic

#### Task 4.4: Agent Integration (30 min)
- Subscribe to auth events and behavioral risk
- Publish auth decisions
- Add audit logging
- Test with sample scenarios

**Deliverable:** Fully functional Agent 2

---

### Phase 5: Agent 3 - Privilege Management (3 hours)

#### Task 5.1: Risk Aggregator (45 min)
**File:** `agents/agent3_privilege.py` (RiskAggregator class)
- Retrieve latest behavioral risk
- Retrieve latest auth risk
- Combine risk scores
- Handle missing risk data

**Deliverable:** Risk aggregation logic

#### Task 5.2: Privilege Decision Engine (60 min)
**File:** `agents/agent3_privilege.py` (PrivilegeDecisionEngine class)
- Apply privilege decision thresholds
- Determine credential lifetime
- Generate decisions (APPROVE/DENY/ESCALATE)
- Create decision reasoning

**Deliverable:** Privilege decision logic

#### Task 5.3: Credential Manager (45 min)
**File:** `agents/agent3_privilege.py` (CredentialManager class)
- Simulate temporary credential issuance
- Track credential expiration
- Generate credential metadata

**Deliverable:** Simulated credential management

#### Task 5.4: Agent Integration (30 min)
- Subscribe to privilege requests and risk scores
- Publish privilege decisions
- Add audit logging
- Test with sample requests

**Deliverable:** Fully functional Agent 3

---

### Phase 6: Event Simulator (4 hours)

#### Task 6.1: User Profile Templates (60 min)
**File:** `simulator/user_profiles.py`
- Define normal user profiles (dev, devops, admin)
- Baseline behaviors (times, locations, resources)
- Profile serialization

**Deliverable:** User profile templates

#### Task 6.2: Event Generator (90 min)
**File:** `simulator/event_generator.py`
- Generate authentication events
- Generate API call events
- Generate privilege requests
- Add realistic variance to events

**Deliverable:** Event generation engine

#### Task 6.3: Attack Scenarios (90 min)
**File:** `simulator/attack_scenarios.py`
- **Scenario 1**: Account takeover (Russia login, unusual resources, privilege escalation)
- **Scenario 2**: Legitimate unusual access (on-call, 2 AM, known IP)
- Scenario orchestration
- Timing and sequencing

**Deliverable:** Attack scenario implementations

---

### Phase 7: Integration & Testing (6 hours)

#### Task 7.1: End-to-End Scenario Testing (2 hours)
- Run Scenario 1 (Account Takeover)
- Run Scenario 2 (Legitimate Unusual Access)
- Verify all agents communicate correctly
- Verify decisions are correct
- Measure detection time

**Deliverable:** Validated E2E scenarios

#### Task 7.2: Bug Fixes & Refinement (2 hours)
- Fix communication issues
- Fix risk calculation bugs
- Improve error handling
- Add missing edge cases

**Deliverable:** Stable system

#### Task 7.3: Audit Trail Validation (1 hour)
- Verify all decisions are logged
- Verify reasoning is clear
- Verify JSON format is correct
- Test audit trail queries

**Deliverable:** Complete audit trail

#### Task 7.4: Performance Testing (1 hour)
- Test with high event volume
- Measure detection latency
- Verify < 5 second target
- Optimize bottlenecks

**Deliverable:** Performance validation

---

### Phase 8: Demo Preparation (3 hours)

#### Task 8.1: CLI Output Polish (90 min)
**File:** `utils/cli_output.py`
- Rich console formatting
- Color-coded risk levels
- Real-time event display
- Decision visualization
- Summary statistics

**Deliverable:** Impressive CLI output

#### Task 8.2: Main Orchestrator (45 min)
**File:** `main.py`
- Start all agents
- Start simulator
- Run demo scenarios
- Graceful shutdown
- Command-line arguments

**Deliverable:** Single-command demo execution

#### Task 8.3: Documentation (45 min)
- README with setup instructions
- Demo script with talking points
- Architecture diagram
- Metrics summary

**Deliverable:** Demo-ready documentation

---

## File Implementation Order

### Priority 1 (Critical Path)
1. `models/events.py`
2. `models/risk.py`
3. `models/decisions.py`
4. `utils/nats_client.py`
5. `agents/base_agent.py`

### Priority 2 (Agents)
6. `agents/agent1_behavioral.py`
7. `agents/agent2_authentication.py`
8. `agents/agent3_privilege.py`

### Priority 3 (Simulation)
9. `simulator/user_profiles.py`
10. `simulator/event_generator.py`
11. `simulator/attack_scenarios.py`

### Priority 4 (Integration)
12. `utils/state_manager.py`
13. `utils/cli_output.py`
14. `main.py`

---

## Risk Mitigation Strategies

### Risk: NATS Connection Issues
**Mitigation:** Test NATS connectivity first, provide clear error messages, fallback to file-based messaging if needed

### Risk: Time Overrun on Agents
**Mitigation:** Implement simplest version first (rule-based), defer statistical complexity if needed

### Risk: Agent Communication Bugs
**Mitigation:** Test message passing independently before full integration

### Risk: Scenario Not Impressive
**Mitigation:** Focus on clear visualization and < 5 second detection time metric

---

## Testing Strategy

### Unit Testing (Minimal)
- Test risk calculation functions
- Test anomaly detection logic
- Test decision thresholds

### Integration Testing (Focus)
- Test agent-to-agent communication
- Test event flow through system
- Test state persistence

### E2E Testing (Primary Validation)
- Run attack scenarios
- Verify correct decisions
- Measure detection time
- Validate audit trail

---

## Success Checkpoints

### Checkpoint 1 (Hour 5): Foundation Complete
✅ NATS running  
✅ Data models defined  
✅ Base agent framework working  

### Checkpoint 2 (Hour 12): Agents Implemented
✅ Agent 1 detects behavioral anomalies  
✅ Agent 2 makes auth decisions  
✅ Agent 3 makes privilege decisions  

### Checkpoint 3 (Hour 20): Simulation Working
✅ Event generator produces realistic events  
✅ Attack scenarios execute  
✅ Agents respond to simulated events  

### Checkpoint 4 (Hour 27): Demo Ready
✅ E2E scenarios validated  
✅ CLI output polished  
✅ Documentation complete  
✅ < 5 second detection demonstrated  

---

## Next Steps

1. ✅ Implementation plan approved
2. 🔄 Begin Phase 1: Foundation setup
3. 🔄 Implement core framework
4. 🔄 Implement agents sequentially
5. 🔄 Build simulator
6. 🔄 Integration testing
7. 🔄 Demo preparation

---

**Ready to begin implementation?** 

Type "start implementation" to begin Phase 1, or ask any questions about the plan.

---

**Document Status:** ✅ Approved  
**Last Updated:** 2024  
**Estimated Completion:** 30 hours from start
