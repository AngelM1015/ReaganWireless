import http from "./http-common";

class googleSheetApiService {
  getProducts(): Promise<any> {
    return http.get(`/google/getProducts`);
  }
  getSheetName(req: any): Promise<any> {
    return http.get(`/google/getSheetName?sheetName=${req.sheetName}`);
  }
  getProductByDeviceName(req: any): Promise<any> {
    return http.get(
      `/google/getProductByDeviceName?deviceName=${req.deviceName}`
    );
  }
  postSubscribers(req: any): Promise<any> {
    return http.post(`/google/subscribers`, req);
  }
  postContact(req: any): Promise<any> {
    return http.post(`/google/postContact`, req);
  }
  postLeads(req: any): Promise<any> {
    return http.post(`/google/postLeads`, req);
  }
}

export default new googleSheetApiService();
