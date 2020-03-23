const request = require('supertest')
const stockController = require('backend/Controllers/StockController.js')
const stockService = require('backend/Services/StockService.js')
jest.mock('backend/Services/StockService.js')

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
};

const mockRequest = (paramData) => {
    return {
        params: {data: paramData},
    };
};

describe("Stock Intraday", () => {
    test("expected path", async () => {
        const req = mockRequest({code: 'msft'})
        const res = mockResponse()

        const resp = {data: 'yeet'};
        stockService.getStockIntraday.mockResolvedValue(resp);
        await stockController.getStockIntraday(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({data: 'yeet'})
    })
})