import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {IdeaEntity} from './idea.entity';
import {Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO } from './idea.dto';

@Injectable()
export class IdeaService {
    constructor(@InjectRepository(IdeaEntity) 
        private ideaRepository: Repository<IdeaEntity>,
        ) {}

    async showAll(){
        return await this.ideaRepository.find();
    }

    async create(data: IdeaDTO){
        const idea = await this.ideaRepository.create(data);
        return idea;
    }

    async read(id: string){
        const idea = await this.ideaRepository.findOne({ where: {id}});
        if(!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return idea;
    }

    async update(id: string, data:Partial<IdeaDTO>){
        const idea = await this.ideaRepository.findOne({where: {id}});
        if (!idea){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.ideaRepository.update({id}, data);
        return idea;
    }

    async destroy(id: string) {
        const idea = await this.ideaRepository.findOne({where: {id}});
        if(!idea){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.ideaRepository.delete({id});
        return idea;
    }
}
