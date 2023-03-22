import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CurpService } from './curp.service';
import { CurpModel } from './curp.interface';

@Controller('curp')
export class CurpController {
    constructor(private readonly curpService: CurpService) { }

    @Get()
    public findAll(){
        return this.curpService.findAll();
    }

    @Get(':curp')
    public findOne(@Param('curp') curp) {
        return this.curpService.findOne(curp);
    }

    @Post()
    public create(@Body() post: CurpModel){
        return this.curpService.create(post);
    }

    @Put(':id')
    public update(@Param('id') id, @Body() post: CurpModel) {
        return this.curpService.update(id, post);
    }

    @Delete(':id')
    public delete(@Param('id') id): Object {
        return this.curpService.delete(id);
    }
}
