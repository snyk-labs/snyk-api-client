// export interface IssuesList extends Array<IssuesResponse> {}

export interface IssuesResponse {
  issue: IssueObject;
  isFixed: boolean;
  introduceDate: string;
  project: IssueProject;
}

export interface IssueObject {
  url: string;
  id: string;
  title: string;
  type: string;
  package: string;
  version: string;
  severity: string;
  language: string;
  packageManager: string;
  semver: object;
  isIgnored: boolean;
  publicationTime: string;
  disclosureTime: string;
  isUpgradable: boolean;
  isPatchable: boolean;
  identifiers: object;
  credit: object[];
  CVSSv3: string;
  cvssScore: string;
  patches: object[];
  isPatched: boolean;
  jiraIssueUrl: string;
}

export interface IssueProject {
  url: string;
  id: string;
  name: string;
  source: string;
  packageManager: string;
  targetFile: string;
}

export interface IssueFilters {
  date: {
    from: string;
    to: string;
  };
  orgs: string[];
  severity: string[];
  types: string[];
  languages: string[];
  ignored: boolean;
  patched: boolean;
  fixable: boolean;
  isFixed: boolean;
  isUpgradable: boolean;
  isPatchable: boolean;
}
