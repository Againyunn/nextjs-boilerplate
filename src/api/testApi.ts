import apiClient from "./apiClient";

export interface TestDto {
  id: string;
  title: string;
  body: string;
}

interface TestApi {
  getTestList(): Promise<TestDto[]>;
  getTestById(id: string): Promise<TestDto>;
}

class TestServerApi implements TestApi {
  async getTestList(): Promise<TestDto[]> {
    const resp = await apiClient.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    return resp.data;
  }

  async getTestById(id: string): Promise<TestDto> {
    const resp = await apiClient.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return resp.data;
  }
}

const testApi = new TestServerApi();
export default testApi;
