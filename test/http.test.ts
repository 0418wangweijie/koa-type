import {Server} from "http";

import request from 'supertest'

import run from "../src/app";


describe("http", () => {
    let server: Server
    beforeAll(async () => {
        server = run(3000)
    })
    it('GET /admin',  () => {
        return request(server)
            .get('/admin')
            .expect(200)
            .then((res: { body: any; })=>{
                expect(res.body).toEqual([1,2,3,4,5])
            })
    });
    afterAll(async () => {
        server.close()
    })
})