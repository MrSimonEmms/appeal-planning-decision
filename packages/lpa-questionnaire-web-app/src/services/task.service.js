const { VIEW } = require('../lib/views');
const TASK_STATUS = require('./task-status/task-statuses');
const otherAppealsCompletion = require('./task-status/other-appeals');

function statusTemp() {
  // TODO: these will be replaces when we have checks for status of each step
  return TASK_STATUS.NOT_STARTED;
}

function statusCheckYourAnswer() {
  // TODO: needs to check questionnaire status to allow check
  return TASK_STATUS.CANNOT_START_YET;
}

const SECTIONS = [
  {
    sectionId: 'aboutAppealSection',
    tasks: [
      {
        taskId: 'submissionAccuracy',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'extraConditions',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'otherAppeals',
        href: `/${VIEW.OTHER_APPEALS}`,
        rule: otherAppealsCompletion,
      },
    ],
  },
  {
    sectionId: 'aboutAppealSiteSection',
    tasks: [
      {
        taskId: 'aboutSite',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
    ],
  },
  {
    sectionId: 'requiredDocumentsSection',
    tasks: [
      {
        taskId: 'plansDecision',
        href: `/${VIEW.PLANS_DECISION}`,
        rule: statusTemp,
      },
      {
        taskId: 'officersReport',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
    ],
  },
  {
    sectionId: 'optionalDocumentsSection',
    tasks: [
      {
        taskId: 'interestedPartiesApplication',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'representationsInterestedParties',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'interestedPartiesAppeal',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'siteNotices',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'planningHistory',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'statutoryDevelopment',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'otherPolicies',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'supplementaryPlanningDocuments',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
      {
        taskId: 'developmentOrNeighbourhood',
        href: `/${VIEW.PLACEHOLDER}`,
        rule: statusTemp,
      },
    ],
  },
  {
    sectionId: 'submitQuestionnaireSection',
    tasks: [
      {
        taskId: 'checkYourAnswers',
        href: '/placeholder',
        rule: statusCheckYourAnswer,
      },
    ],
  },
];

const HEADERS = {
  aboutAppealSection: 'About the appeal',
  submissionAccuracy: "Review accuracy of the appellant's submission",
  extraConditions: 'Do you have any extra conditions?',
  otherAppeals: 'Tell us about any appeals in the immediate area',
  aboutAppealSiteSection: 'About the appeal site',
  aboutSite: 'Tell us about the appeal site',
  requiredDocumentsSection: 'Required documents',
  plansDecision: 'Upload the plans used to reach the decision',
  officersReport: "Upload the Planning Officer's report",
  optionalDocumentsSection: 'Optional supporting documents',
  interestedPartiesApplication: 'Telling interested parties about the application',
  representationsInterestedParties: 'Representations from interested parties',
  interestedPartiesAppeal: 'Notifying interested parties of the appeal',
  siteNotices: 'Site notices',
  planningHistory: 'Planning history',
  statutoryDevelopment: 'Statutory development plan policy',
  otherPolicies: 'Other relevant policies',
  supplementaryPlanningDocuments: 'Supplementary planning document extracts',
  developmentOrNeighbourhood: 'Development Plan Document or Neighbourhood Plan',
  submitQuestionnaireSection: 'Before you submit',
  checkYourAnswers: 'Check your answers',
};

const DESCRIPTIONS = {
  optionalDocumentsSection:
    'Only include documents that were considered when making a decision on the application.',
};

const getTaskStatus = (appealReply, sectionId, taskId) => {
  try {
    const section = SECTIONS.find((scn) => scn.sectionId === sectionId);
    const task = section.tasks.find((tsk) => tsk.taskId === taskId);
    return task.rule(appealReply);
  } catch (e) {
    return null;
  }
};

module.exports = {
  HEADERS,
  DESCRIPTIONS,
  SECTIONS,
  getTaskStatus,
};
