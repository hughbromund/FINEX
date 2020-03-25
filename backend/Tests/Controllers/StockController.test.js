const request = require('supertest')
const stockController = require('backend/Controllers/StockController.js')
const stockService = require('backend/Services/StockService.js')
jest.mock('backend/Services/StockService.js')

// this mocks the res object
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
};

// these mock the req object
const mockRequestBasic = (paramData) => {
    return {
        params: {code: paramData}
    };
};

const mockRequestAnalytics = (paramCode, paramInterval, paramSeriesType) => {
    return {
        params: {code: paramCode, interval: paramInterval, series_type: paramSeriesType}
    };
};

describe("Stock Intraday", () => {
    test("expected path", async () => {
        const req = mockRequestBasic('msft')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getStockIntraday.mockResolvedValue(resp);
        await stockController.getStockIntraday(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })

    test("code is undefined", async () => {
        const req = mockRequestBasic(null)
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getStockIntraday.mockResolvedValue(resp);
        await stockController.getStockIntraday(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })

    test("stock is not found", async () => {
        const req = mockRequestBasic('cscd')
        const res = mockResponse()

        stockService.getStockIntraday.mockImplementation(() => {
            throw new Error();
          });
        await stockController.getStockIntraday(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'cscd could not be found'})
    })
})


describe("Stock Daily", () => {
    test("expected path", async () => {
        const req = mockRequestBasic('msft')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getStockDaily.mockResolvedValue(resp);
        await stockController.getStockDaily(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })

    test("code is undefined", async () => {
        const req = mockRequestBasic(null)
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getStockDaily.mockResolvedValue(resp);
        await stockController.getStockDaily(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })

    test("stock is not found", async () => {
        const req = mockRequestBasic('cscd')
        const res = mockResponse()

        stockService.getStockDaily.mockImplementation(() => {
            throw new Error();
          });
        await stockController.getStockDaily(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'cscd could not be found'})
    })
})


describe("Stock SMA", () => {
    test("expected path", async () => {
        const req = mockRequestAnalytics('msft', 'daily', 'open')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getSMA.mockResolvedValue(resp);
        await stockController.getSMA(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })

    test("code is undefined", async () => {
        const req = mockRequestAnalytics(null, 'daily', 'close')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getSMA.mockResolvedValue(resp);
        await stockController.getSMA(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })

    test("stock is not found", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'close')
        const res = mockResponse()

        stockService.getSMA.mockImplementation(() => {
            throw new Error();
          });
        await stockController.getSMA(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'cscd could not be found'})
    })

    test("interval is incorrect", async () => {
        const req = mockRequestAnalytics('msft', 'anytime', 'close')
        const res = mockResponse()

        await stockController.getSMA(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'anytime is not a valid interval.'})
    })

    test("series_type is incorrect", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'point')
        const res = mockResponse()

        await stockController.getSMA(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'point is not a valid series_type.'})
    })
})


describe("Stock EMA", () => {
    test("expected path", async () => {
        const req = mockRequestAnalytics('msft', 'daily', 'open')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getEMA.mockResolvedValue(resp);
        await stockController.getEMA(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })

    test("code is undefined", async () => {
        const req = mockRequestAnalytics(null, 'daily', 'close')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getEMA.mockResolvedValue(resp);
        await stockController.getEMA(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })

    test("stock is not found", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'close')
        const res = mockResponse()

        stockService.getEMA.mockImplementation(() => {
            throw new Error();
          });
        await stockController.getEMA(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'cscd could not be found'})
    })

    test("interval is incorrect", async () => {
        const req = mockRequestAnalytics('msft', 'anytime', 'close')
        const res = mockResponse()

        await stockController.getEMA(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'anytime is not a valid interval.'})
    })

    test("series_type is incorrect", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'point')
        const res = mockResponse()

        await stockController.getEMA(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'point is not a valid series_type.'})
    })
})


describe("Stock RSI", () => {
    test("expected path", async () => {
        const req = mockRequestAnalytics('msft', 'daily', 'open')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getRSI.mockResolvedValue(resp);
        await stockController.getRSI(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })

    test("code is undefined", async () => {
        const req = mockRequestAnalytics(null, 'daily', 'close')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getRSI.mockResolvedValue(resp);
        await stockController.getRSI(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })

    test("stock is not found", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'close')
        const res = mockResponse()

        stockService.getRSI.mockImplementation(() => {
            throw new Error();
          });
        await stockController.getRSI(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'cscd could not be found'})
    })

    test("interval is incorrect", async () => {
        const req = mockRequestAnalytics('msft', 'anytime', 'close')
        const res = mockResponse()

        await stockController.getRSI(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'anytime is not a valid interval.'})
    })

    test("series_type is incorrect", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'point')
        const res = mockResponse()

        await stockController.getRSI(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'point is not a valid series_type.'})
    })
})


describe("Stock BBANDS", () => {
    test("expected path", async () => {
        const req = mockRequestAnalytics('msft', 'daily', 'open')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getBbands.mockResolvedValue(resp);
        await stockController.getBbands(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })

    test("code is undefined", async () => {
        const req = mockRequestAnalytics(null, 'daily', 'close')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getBbands.mockResolvedValue(resp);
        await stockController.getBbands(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })

    test("stock is not found", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'close')
        const res = mockResponse()

        stockService.getBbands.mockImplementation(() => {
            throw new Error();
          });
        await stockController.getBbands(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'cscd could not be found'})
    })

    test("interval is incorrect", async () => {
        const req = mockRequestAnalytics('msft', 'anytime', 'close')
        const res = mockResponse()

        await stockController.getBbands(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'anytime is not a valid interval.'})
    })

    test("series_type is incorrect", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'point')
        const res = mockResponse()

        await stockController.getBbands(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'point is not a valid series_type.'})
    })
})


describe("Stock MACD", () => {
    test("expected path", async () => {
        const req = mockRequestAnalytics('msft', 'daily', 'open')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getMACD.mockResolvedValue(resp);
        await stockController.getMACD(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })

    test("code is undefined", async () => {
        const req = mockRequestAnalytics(null, 'daily', 'close')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getMACD.mockResolvedValue(resp);
        await stockController.getMACD(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })

    test("stock is not found", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'close')
        const res = mockResponse()

        stockService.getMACD.mockImplementation(() => {
            throw new Error();
          });
        await stockController.getMACD(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'cscd could not be found'})
    })

    test("interval is incorrect", async () => {
        const req = mockRequestAnalytics('msft', 'anytime', 'close')
        const res = mockResponse()

        await stockController.getMACD(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'anytime is not a valid interval.'})
    })

    test("series_type is incorrect", async () => {
        const req = mockRequestAnalytics('cscd', 'daily', 'point')
        const res = mockResponse()

        await stockController.getMACD(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'point is not a valid series_type.'})
    })
})