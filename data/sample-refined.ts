const sampleRefined = `## TL;DR
The current average time-to-fix for customer-reported bugs is over 8 days, leading to a 25% increase in customer churn and a 30% decrease in customer satisfaction. To address this, we are implementing a bug triage SLA program with clear severity tiers (P1-P4) and accountability across product, engineering, and support teams. We will consider this effort a success if we can reduce the P1 bug mean time-to-resolution (MTTR) from 8 days to 2 days within 12 weeks of rollout, achieve a bug triage response time of under 4 hours for 95% of incoming bugs, and increase customer satisfaction ratings related to bug fixes by 15% within 6 months.

## Background and Problem Statement
Our customers are experiencing significant delays in bug fixes, resulting in frustration and churn. Data from the past quarter shows that the average time-to-fix for customer-reported bugs is 8.5 days, with 20% of bugs taking over 14 days to resolve. This issue affects all three product teams and is exacerbated by the lack of clear severity tiers and accountability. With a growing customer base of 10,000+ users and increasing competition, it's essential we address this issue promptly to maintain customer satisfaction and loyalty. Our customer satisfaction surveys indicate that 40% of customers are dissatisfied with the current bug fix process.

## Goals
- Reduce P1 bug MTTR from 8 days to 2 days within 12 weeks of rollout
- Achieve a bug triage response time of under 4 hours for 95% of incoming bugs
- Increase customer satisfaction ratings related to bug fixes by 15% within 6 months
- Reduce the average time-to-fix for all bugs by 30% within 9 months

## Non-Goals
- This PRD does not cover the implementation of automated bug fixing or self-healing systems, which would require an additional $200,000 in development costs and 6 months of development time
- We will not be revising the existing support ticketing system or workflow in this project, as it would require significant resources and time, exceeding the 6-week rollout window
- The scope of this project does not include adding new headcount to the engineering or support teams, as it would require additional budget approvals and would not be feasible within the given constraints

## Proposed Solution
The proposed bug triage SLA program will establish clear severity tiers (P1-P4) with corresponding response and resolution time targets:
- P1: Critical bugs with a response time target of 1 hour and a resolution time target of 2 days
- P2: High-priority bugs with a response time target of 2 hours and a resolution time target of 5 days
- P3: Medium-priority bugs with a response time target of 4 hours and a resolution time target of 10 days
- P4: Low-priority bugs with a response time target of 8 hours and a resolution time target of 30 days
Each product team will designate a bug triage lead responsible for ensuring that all incoming bugs are properly triaged and assigned to the correct engineer within the specified response time targets. We will also implement a dashboard for real-time monitoring of bug triage performance and establish regular review meetings to discuss progress, identify bottlenecks, and adjust the process as needed.

## Alternatives Considered
1. **Implementing a fully automated bug triage system**: Rejected due to the high complexity of our product suite and the need for human judgment in accurately assessing bug severity and impact. An automated system would require significant development time and resources, exceeding the 6-week rollout window. Additionally, our preliminary estimates suggest that an automated system would only be able to accurately triage 60% of bugs, resulting in a significant number of false positives and negatives.
2. **Hiring additional support staff to augment the triage process**: Rejected because it would require adding 2-3 new headcount, which is not feasible within the given constraints and would require additional budget approvals.
3. **Using an existing third-party bug tracking system with built-in SLA features**: Rejected because our current system is heavily customized and integrating a new system would require significant resources and time, exceeding the 6-week rollout window and requiring an additional $100,000 in implementation costs.

## Risks and Mitigations
- **Risk 1: Inaccurate severity tier definitions**: Mitigation - Conduct a thorough review of historical bug data to inform severity tier definitions, and establish a process for regular review and adjustment of these definitions.
- **Risk 2: Ineffective bug triage leads**: Mitigation - Provide comprehensive training for bug triage leads, and establish clear expectations and metrics for their performance.
- **Risk 3: Insufficient resources**: Mitigation - Conduct a thorough analysis of resource requirements, and identify potential bottlenecks and areas for optimization.
- **Risk 4: Escalation procedure not effective**: Mitigation - Establish a clear escalation procedure with defined thresholds and timelines, and conduct regular review meetings to discuss progress and identify areas for improvement.

## Rollout Plan and Success Metrics
The rollout will occur in two phases:
1. Phase 1 (weeks 1-3): Establish severity tiers, designate bug triage leads, and implement the dashboard for real-time monitoring.
2. Phase 2 (weeks 4-6): Refine the process based on initial feedback, establish regular review meetings, and finalize the escalation procedure.
Success will be measured by tracking:
- P1 bug MTTR
- Bug triage response time
- Customer satisfaction ratings related to bug fixes
- Average time-to-fix for all bugs
- Percentage of bugs resolved within target response and resolution times

## Stakeholders
- **Responsible**: Engineering managers and bug triage leads will be responsible for implementing and maintaining the bug triage SLA program.
- **Accountable**: Product leaders will be accountable for ensuring that the program meets its targets and makes necessary adjustments.
- **Consulted**: Support team leads will be consulted to ensure that the program aligns with existing support workflows and to provide feedback on its effectiveness.
- **Informed**: The entire engineering and product organization will be informed of the program's progress and any changes to the process. Regular update meetings will be held to ensure that all stakeholders are informed and aligned.`;

export default sampleRefined;
