import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tecnico} from '../models';
import {TecnicoRepository} from '../repositories';

export class TecnicoController {
  constructor(
    @repository(TecnicoRepository)
    public tecnicoRepository : TecnicoRepository,
  ) {}

  @post('/tecnicos')
  @response(200, {
    description: 'Tecnico model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tecnico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tecnico, {
            title: 'NewTecnico',
            exclude: ['id'],
          }),
        },
      },
    })
    tecnico: Omit<Tecnico, 'id'>,
  ): Promise<Tecnico> {
    return this.tecnicoRepository.create(tecnico);
  }

  @get('/tecnicos/count')
  @response(200, {
    description: 'Tecnico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tecnico) where?: Where<Tecnico>,
  ): Promise<Count> {
    return this.tecnicoRepository.count(where);
  }

  @get('/tecnicos')
  @response(200, {
    description: 'Array of Tecnico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tecnico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tecnico) filter?: Filter<Tecnico>,
  ): Promise<Tecnico[]> {
    return this.tecnicoRepository.find(filter);
  }

  @patch('/tecnicos')
  @response(200, {
    description: 'Tecnico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tecnico, {partial: true}),
        },
      },
    })
    tecnico: Tecnico,
    @param.where(Tecnico) where?: Where<Tecnico>,
  ): Promise<Count> {
    return this.tecnicoRepository.updateAll(tecnico, where);
  }

  @get('/tecnicos/{id}')
  @response(200, {
    description: 'Tecnico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tecnico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tecnico, {exclude: 'where'}) filter?: FilterExcludingWhere<Tecnico>
  ): Promise<Tecnico> {
    return this.tecnicoRepository.findById(id, filter);
  }

  @patch('/tecnicos/{id}')
  @response(204, {
    description: 'Tecnico PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tecnico, {partial: true}),
        },
      },
    })
    tecnico: Tecnico,
  ): Promise<void> {
    await this.tecnicoRepository.updateById(id, tecnico);
  }

  @put('/tecnicos/{id}')
  @response(204, {
    description: 'Tecnico PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tecnico: Tecnico,
  ): Promise<void> {
    await this.tecnicoRepository.replaceById(id, tecnico);
  }

  @del('/tecnicos/{id}')
  @response(204, {
    description: 'Tecnico DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tecnicoRepository.deleteById(id);
  }
}
