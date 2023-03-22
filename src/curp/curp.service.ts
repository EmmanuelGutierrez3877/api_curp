import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CurpModel } from './curp.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

@Injectable()
export class CurpService {
    private curps: Array<CurpModel> = [];

    constructor(@InjectModel('Curp') private readonly CurpModel: Model<CurpModel>) { }

    public async findAll(){
        return await this.CurpModel.find()
    }

    public async findOne(data){
        data = data.toUpperCase()
        let res = await this.CurpModel.findOne({curp:data})

        if (!res) {
            throw new NotFoundException('Curp not found.');
        }
        return res;
    }

    public async create(data: CurpModel) {
        // if the title is already in use by another post
        if (data.curp == undefined) {
            throw new UnprocessableEntityException('Curp invalid.');
        }

        data.curp = data.curp.toUpperCase()
        if (this.validarCrup(data.curp) == false) {
            throw new UnprocessableEntityException('Curp invalid')
        }

        let curpExists = await this.CurpModel.findOne({curp:data.curp})

        if (curpExists) {
            throw new UnprocessableEntityException('Curp already exists.');
        }

        let newCurp = new this.CurpModel({
            curp: data.curp
        })

        newCurp = await newCurp.save()

        return newCurp;
    }

    public async update(id: string, data: CurpModel) {

        let res 
        try {
            res = await this.CurpModel.findOne({_id:id})
            if(res == null){
                throw new UnprocessableEntityException('Id invalid.');
            }
        } catch (error) {
            throw new UnprocessableEntityException('Id invalid.');
        }

        data.curp = data.curp.toUpperCase()
        if (this.validarCrup(data.curp) == false) {
            throw new UnprocessableEntityException('Curp invalid')
        }

        let curpExists = await this.CurpModel.findOne({curp:data.curp})
        if (curpExists) {
            throw new UnprocessableEntityException('Curp already exists.');
        }

        let res2 = await this.CurpModel.updateOne({_id:id}, data)
        

        return res2;
    }

    public async delete(id) {
        let res
        try {
            res = await this.CurpModel.findOne({_id:id})
            if(res == null){
                throw new UnprocessableEntityException('Id invalid.');
            }
        } catch (error) {
            throw new UnprocessableEntityException('Id invalid.');
        }

        res =await this.CurpModel.deleteOne({_id:id})

        return (res)
    }

    public validarCrup(curp) {
        curp = curp.toUpperCase()
        var re = /^([A-ZÑ][AEIOUXÁÉÍÓÚ][A-ZÑ]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            validado = curp.match(re);

        if (!validado) {
            return false;
        }
        return true
    }
}
