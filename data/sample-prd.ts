const samplePrd = `## TL;DR
The current average time-to-fix for customer-reported bugs is over 8 days, leading to customer churn and dissatisfaction. To address this, we are implementing a bug triage SLA program with clear severity tiers and accountability across product, engineering, and support teams. We will consider this effort a success if we can reduce the P1 bug mean time-to-resolution (MTTR) from 8 days to 2 days within 12 weeks of rollout.

## Background and Problem Statement
Our customers are experiencing significant delays in bug fixes, resulting in frustration and churn. Data from the past quarter shows that the average time-to-fix for customer-reported bugs is 8.5 days, with 20% of bugs taking over 14 days to resolve. This issue affects all three product teams and is exacerbated by the lack of clear severity tiers and accountability. With a growing customer base and increasing competition, it's essential we address this issue promptly to maintain customer satisfaction and loyalty.

## Goals
- Reduce P1 bug MTTR from 8 days to 2 days within 12 weeks of rollout
- Achieve a bug triage response time of under 4 hours for 95% of incoming bugs
- Increase customer satisfaction ratings related to bug fixes by 15% within 6 months

## Non-Goals
- This PRD does not cover the implementation of automated bug fixing or self-healing systems
- We will not be revising the existing support ticketing system or workflow in this project
- The scope of this project does not include adding new headcount to the engineering or support teams

## Proposed Solution
The proposed bug triage SLA program will establish clear severity tiers (P1-P4) with corresponding response and resolution time targets. Each product team will designate a bug triage lead responsible for ensuring that all incoming bugs are properly triaged and assigned to the correct engineer within the specified response time targets. We will also implement a dashboard for real-time monitoring of bug triage performance and establish regular review meetings to discuss progress, identify bottlenecks, and adjust the process as needed.

## Alternatives Considered
1. **Implementing a fully automated bug triage system**: Rejected due to the high complexity of our product suite and the need for human judgment in accurately assessing bug severity and impact.
2. **Hiring additional support staff to augment the triage process**: Rejected because it would require adding headcount, which is not feasible within the given constraints.
3. **Using an existing third-party bug tracking system with built-in SLA features**: Rejected because our current system is heavily customized and integrating a new system would require significant resources and time, exceeding the 6-week rollout window.

## Risks and Open Questions
- There is a risk that the initial severity tier definitions may not accurately reflect the true impact of bugs, leading to incorrect prioritization.
- The effectiveness of the program depends on the ability of the bug triage leads to accurately assess bug severity and assign resources accordingly.
- We have not yet determined the exact metrics or thresholds for escalating bugs that are not being addressed within the target response times.

## Rollout Plan and Success Metrics
The rollout will occur in two phases:
1. Phase 1 (weeks 1-3): Establish severity tiers, designate bug triage leads, and implement the dashboard for real-time monitoring.
2. Phase 2 (weeks 4-6): Refine the process based on initial feedback, establish regular review meetings, and finalize the escalation procedure.
Success will be measured by tracking P1 bug MTTR, bug triage response time, and customer satisfaction ratings related to bug fixes.

## Stakeholders
- **Responsible**: Engineering managers and bug triage leads will be responsible for implementing and maintaining the bug triage SLA program.
- **Accountable**: Product leaders will be accountable for ensuring that the program meets its targets and makes necessary adjustments.
- **Consulted**: Support team leads will be consulted to ensure that the program aligns with existing support workflows and to provide feedback on its effectiveness.
- **Informed**: The entire engineering and product organization will be informed of the program's progress and any changes to the process.`;

export default samplePrd;
