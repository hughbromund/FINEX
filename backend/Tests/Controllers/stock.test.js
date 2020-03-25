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

// this mocks the req object
const mockRequest = (paramData) => {
    return {
        params: {code: paramData},
    };
};

describe("Stock Intraday", () => {
    test("expected path", async () => {
        const req = mockRequest('msft')
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getStockIntraday.mockResolvedValue(resp);
        await stockController.getStockIntraday(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })

    test("code is undefined", async () => {
        const req = mockRequest(null)
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getStockIntraday.mockResolvedValue(resp);
        await stockController.getStockIntraday(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })

    test("stock is not found", async () => {
        const req = mockRequest(null)
        const res = mockResponse()

        const resp = {status: 400};
        stockService.getStockIntraday.mockResolvedValue(resp);
        await stockController.getStockIntraday(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'code is undefined'})
    })
})