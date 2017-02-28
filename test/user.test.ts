/**
 * Created by xinhui on 17/2/28.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import * as mongoose from 'mongoose';
import app from '../src/App';
import {IUserModel, userSchema} from "../src/models/user";
import DataAccess from "../src/DataAccess";

chai.use(chaiHttp);
const expect = chai.expect;
var User: mongoose.Model<IUserModel> = DataAccess.connect().model<IUserModel>('user', userSchema);

describe('GET api/vi/users', () => {
    it('responds with JSON array', () => {
        return chai.request(app).get('/api/v1/users')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });
});

describe('Create', () => {
    it("should create a new User", function () {
        //user object
        let user = {
            email: "foo@bar.com",
            firstName: "Brian",
            lastName: "Love"
        };

        //create user and return promise
        return new User(user).save().then(result => {
            //verify _id property exists
            expect(result._id).to.exist;

            //verify email
            expect(result.email).to.equal(user.email);

            //verify firstName
            expect(result.firstName).to.equal(user.firstName);

            //verify lastName
            expect(result.lastName).to.equal(user.lastName);
        })
    });
});