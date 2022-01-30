import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';

describe('HttpService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  interface Data {
    name: string;
  }

  beforeEach(
    () => {
      TestBed.configureTestingModule(
        {
          imports: [
            HttpClientTestingModule,
          ],
        }
      );

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
    }
  );

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });

  it('should be correct api url', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service.API_URL).toEqual('http://localhost:9876/api');
  });

  it('can test HttpClient.get', () => {
    const testData: Data = { name: 'Test Data' };

    httpClient.get<Data>('/api/data')
      .subscribe(data => {
        expect(data).toEqual(testData);
      });

    const req = httpTestingController.expectOne('/api/data');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('get method without params', () => {
    const testData: Data = { name: 'Test Data' };
    const service: HttpService = TestBed.get(HttpService);

    service.get<Data>('/data')
      .subscribe(data => {
        expect(data).toEqual(testData);
      });

    const req = httpTestingController.expectOne('http://localhost:9876/api/data');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('get method as error with retry 4 times', () => {
    const testData: Data = { name: 'Test Data' };
    const service: HttpService = TestBed.get(HttpService);
    const emsg = 'deliberate 404 error';

    service.get<Data>('/data')
      .subscribe(
        data => {
          expect(data).toEqual(testData);
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

    const retryCount = 3;
    for (let i = 0; i < retryCount; i++) {
      const errreq = httpTestingController.expectOne('http://localhost:9876/api/data');
      errreq.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
    const req = httpTestingController.expectOne('http://localhost:9876/api/data');
    req.flush(testData);

  });

  it('get method with params', () => {
    const testData: Data = { name: 'Test Data' };
    const service: HttpService = TestBed.get(HttpService);
    const id: Map<string, string> = new Map();
    id.set('id', 'idstring');
    service.get<Data>('/data', id)
      .subscribe(data => {
        expect(data).toEqual(testData);
      });

    const req = httpTestingController.expectOne('http://localhost:9876/api/data?id=idstring');
    expect(req.request.method).toEqual('GET');
    const params: HttpParams = new HttpParams();
    params.append('id', 'idstring');
    expect(req.request.params.toString).toEqual(params.toString);
    req.flush(testData);
  });

  it('post method', () => {
    const testData: Data = { name: 'Test Data' };
    const resultData: Data = { name: 'Result Data' };
    const service: HttpService = TestBed.get(HttpService);

    service.post<Data>('/data', testData)
      .subscribe(data => {
        expect(data).toEqual(resultData);
      });

    const req = httpTestingController.expectOne('http://localhost:9876/api/data');
    expect(req.request.method).toEqual('POST');
    req.flush(resultData);
  });

  it('post method as error with retry 4 times', () => {
    const testData: Data = { name: 'Test Data' };
    const resultData: Data = { name: 'Result Data' };
    const service: HttpService = TestBed.get(HttpService);
    const emsg = 'deliberate 404 error';

    service.post<Data>('/data', testData)
      .subscribe(
        data => {
          expect(data).toEqual(resultData);
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

    const retryCount = 3;
    for (let i = 0; i < retryCount; i++) {
      const errreq = httpTestingController.expectOne('http://localhost:9876/api/data');
      errreq.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
    const req = httpTestingController.expectOne('http://localhost:9876/api/data');
    req.flush(resultData);

  });

  it('put method', () => {
    const testData: Data = { name: 'Test Data' };
    const resultData: Data = { name: 'Result Data' };
    const service: HttpService = TestBed.get(HttpService);

    service.put<Data>('/data', testData)
      .subscribe(data => {
        expect(data).toEqual(resultData);
      });

    const req = httpTestingController.expectOne('http://localhost:9876/api/data');
    expect(req.request.method).toEqual('PUT');
    req.flush(resultData);
  });

  it('put method as error with retry 4 times', () => {
    const testData: Data = { name: 'Test Data' };
    const resultData: Data = { name: 'Result Data' };
    const service: HttpService = TestBed.get(HttpService);
    const emsg = 'deliberate 404 error';

    service.put<Data>('/data', testData)
      .subscribe(
        data => {
          expect(data).toEqual(resultData);
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

    const retryCount = 3;
    for (let i = 0; i < retryCount; i++) {
      const errreq = httpTestingController.expectOne('http://localhost:9876/api/data');
      errreq.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
    const req = httpTestingController.expectOne('http://localhost:9876/api/data');
    req.flush(resultData);

  });

  it('delete method', () => {
    const testData: string[] = ['id1', 'id2'];
    const resultData: Data[] = [];
    const service: HttpService = TestBed.get(HttpService);

    service.delete<Data>('/data', testData)
      .subscribe(data => {
        expect(data).toEqual(resultData);
      });

    const req = httpTestingController.expectOne('http://localhost:9876/api/data');
    expect(req.request.method).toEqual('DELETE');
    req.flush(resultData);
  });

  it('delete method as error with retry 4 times', () => {
    const testData: string[] = ['id1', 'id2'];
    const resultData: Data[] = [];
    const service: HttpService = TestBed.get(HttpService);
    const emsg = 'deliberate 404 error';

    service.delete<Data>('/data', testData)
      .subscribe(
        data => {
          expect(data).toEqual(resultData);
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

    const retryCount = 3;
    for (let i = 0; i < retryCount; i++) {
      const errreq = httpTestingController.expectOne('http://localhost:9876/api/data');
      errreq.flush(emsg, { status: 404, statusText: 'Not Found' });
    }
    const req = httpTestingController.expectOne('http://localhost:9876/api/data');
    req.flush(resultData);

  });
});
