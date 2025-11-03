# 🔵 INCEPTION PHASE - Project Questionnaire

## Zero-Trust Identity Agent - Critical Decisions

Please answer the following questions to help shape the implementation approach. Select one option for each question or provide your specific answer.

---

### Q1: Deployment Target & Timeline
**What is your primary deployment target for the hackathon demo?**

- [ ] A) Fully functional AWS deployment (requires AWS account with appropriate permissions)
- [ ] B) Local simulation environment (LocalStack + mocked AWS services)
- [ ] C) Hybrid approach (some real AWS services + local simulation)

**Your Answer:** _____________________

---

### Q2: Data Source Strategy
**How should we handle CloudTrail and IAM event data for the demo?**

- [ ] A) Use real CloudTrail events from an existing AWS account
- [ ] B) Generate synthetic event data that simulates realistic patterns
- [ ] C) Replay recorded CloudTrail logs from sample data
- [ ] D) Combination of synthetic baseline + live events

**Your Answer:** _____________________

---

### Q3: Behavioral Analysis Complexity
**What level of sophistication for Agent 1's behavioral analysis?**

- [ ] A) Simple statistical models (z-score, moving averages) - Fast to implement
- [ ] B) Time-series analysis with sliding windows - Moderate complexity
- [ ] C) ML-based anomaly detection (Isolation Forest, etc.) - Higher accuracy but more complex
- [ ] D) Rule-based heuristics only - Simplest approach

**Your Answer:** _____________________

---

### Q4: Agent Communication Pattern
**How should the three agents communicate and share risk scores?**

- [ ] A) EventBridge events (asynchronous, AWS-native)
- [ ] B) Direct Lambda invocations (synchronous, faster)
- [ ] C) Shared DynamoDB state with polling (simple, eventually consistent)
- [ ] D) Combination: EventBridge for events + DynamoDB for state

**Your Answer:** _____________________

---

### Q5: Dashboard Requirements
**What's the priority for the React dashboard?**

- [ ] A) Full-featured real-time dashboard with all metrics and visualizations
- [ ] B) Minimal dashboard showing key metrics only (risk scores, recent decisions)
- [ ] C) Static dashboard with pre-generated demo data
- [ ] D) CLI-based output is sufficient, skip dashboard for MVP

**Your Answer:** _____________________

---

### Q6: Authentication & Step-Up Mechanisms
**How should Agent 2 handle step-up authentication?**

- [ ] A) Integrate with AWS Cognito for MFA challenges
- [ ] B) Simulate step-up authentication (mock responses)
- [ ] C) Use AWS SSO/IAM Identity Center integration
- [ ] D) Simple notification-based approval (SNS/email)

**Your Answer:** _____________________

---

### Q7: Privilege Management Scope
**What privilege operations should Agent 3 handle?**

- [ ] A) Temporary credential elevation (STS AssumeRole with time limits)
- [ ] B) IAM policy modifications (add/remove permissions)
- [ ] C) Permission boundaries enforcement
- [ ] D) All of the above
- [ ] E) Focus on A only for MVP

**Your Answer:** _____________________

---

### Q8: Attack Simulation Scope
**Which attack scenarios should the simulator demonstrate?**

- [ ] A) All three scenarios from the intent statement
- [ ] B) Focus on Scenario 1 (Account Takeover) only
- [ ] C) Scenarios 1 & 2 (Account Takeover + Legitimate Unusual Access)
- [ ] D) Custom scenario selection

**Your Answer:** _____________________

---

### Q9: Infrastructure as Code
**How should infrastructure be provisioned?**

- [ ] A) AWS CDK (TypeScript/Python)
- [ ] B) Terraform
- [ ] C) AWS SAM (Serverless Application Model)
- [ ] D) CloudFormation templates
- [ ] E) Manual setup with documentation

**Your Answer:** _____________________

---

### Q10: Programming Language Preference
**Primary language for Lambda functions?**

- [ ] A) Python (fast development, good for data processing)
- [ ] B) Node.js/TypeScript (consistent with React frontend)
- [ ] C) Go (performance, compiled)
- [ ] D) Mix: Python for agents, TypeScript for infrastructure

**Your Answer:** _____________________

---

### Q11: Testing Strategy
**What level of testing for the hackathon MVP?**

- [ ] A) Unit tests for core agent logic
- [ ] B) Integration tests for agent communication
- [ ] C) End-to-end tests with attack simulations
- [ ] D) Manual testing only (fastest for hackathon)
- [ ] E) A + C (unit tests + e2e scenarios)

**Your Answer:** _____________________

---

### Q12: Compliance & Audit Trail
**How detailed should the audit trail be?**

- [ ] A) Full audit trail with all decisions, risk scores, and reasoning
- [ ] B) Key decisions only (approvals, denials, escalations)
- [ ] C) Minimal logging for demo purposes
- [ ] D) CloudWatch Logs + structured JSON for analysis

**Your Answer:** _____________________

---

## Additional Context

**Q13: Are there any specific AWS services or technologies you want to avoid or must include?**

Your Answer: _____________________

---

**Q14: What's your hackathon timeline? (e.g., 24 hours, 48 hours, 1 week)**

Your Answer: _____________________

---

**Q15: Do you have an existing AWS account set up, or do we need to account for account setup time?**

Your Answer: _____________________

---

## Next Steps

Once you've answered these questions, I'll:
1. Generate a detailed requirements document
2. Create user stories (if applicable based on complexity)
3. Design the system architecture
4. Assess risks and create an execution plan
5. Move to the Construction Phase with detailed implementation

**Please fill out this questionnaire and share your answers. You can either:**
- Edit this file directly and let me know
- Reply with your answers in the chat (e.g., "Q1: B, Q2: B, Q3: A...")
