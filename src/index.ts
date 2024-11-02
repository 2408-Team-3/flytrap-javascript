class Flytrap {
  private projectId: string;
  private apiEndpoint: string;
  private publicApiKey: string;

  constructor(config: { projectId: string; apiEndpoint: string; publicKey: string }) {
    this.projectId = config.projectId;
    this.apiEndpoint = config.apiEndpoint;
    this.publicApiKey = config.publicKey;
  }

}