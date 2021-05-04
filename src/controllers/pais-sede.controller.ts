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
import {PaisSede} from '../models';
import {PaisSedeRepository} from '../repositories';

export class PaisSedeController {
  constructor(
    @repository(PaisSedeRepository)
    public paisSedeRepository : PaisSedeRepository,
  ) {}

  @post('/pais-sedes')
  @response(200, {
    description: 'PaisSede model instance',
    content: {'application/json': {schema: getModelSchemaRef(PaisSede)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaisSede, {
            title: 'NewPaisSede',
            exclude: ['id'],
          }),
        },
      },
    })
    paisSede: Omit<PaisSede, 'id'>,
  ): Promise<PaisSede> {
    return this.paisSedeRepository.create(paisSede);
  }

  @get('/pais-sedes/count')
  @response(200, {
    description: 'PaisSede model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PaisSede) where?: Where<PaisSede>,
  ): Promise<Count> {
    return this.paisSedeRepository.count(where);
  }

  @get('/pais-sedes')
  @response(200, {
    description: 'Array of PaisSede model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaisSede, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PaisSede) filter?: Filter<PaisSede>,
  ): Promise<PaisSede[]> {
    return this.paisSedeRepository.find(filter);
  }

  @patch('/pais-sedes')
  @response(200, {
    description: 'PaisSede PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaisSede, {partial: true}),
        },
      },
    })
    paisSede: PaisSede,
    @param.where(PaisSede) where?: Where<PaisSede>,
  ): Promise<Count> {
    return this.paisSedeRepository.updateAll(paisSede, where);
  }

  @get('/pais-sedes/{id}')
  @response(200, {
    description: 'PaisSede model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PaisSede, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PaisSede, {exclude: 'where'}) filter?: FilterExcludingWhere<PaisSede>
  ): Promise<PaisSede> {
    return this.paisSedeRepository.findById(id, filter);
  }

  @patch('/pais-sedes/{id}')
  @response(204, {
    description: 'PaisSede PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaisSede, {partial: true}),
        },
      },
    })
    paisSede: PaisSede,
  ): Promise<void> {
    await this.paisSedeRepository.updateById(id, paisSede);
  }

  @put('/pais-sedes/{id}')
  @response(204, {
    description: 'PaisSede PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() paisSede: PaisSede,
  ): Promise<void> {
    await this.paisSedeRepository.replaceById(id, paisSede);
  }

  @del('/pais-sedes/{id}')
  @response(204, {
    description: 'PaisSede DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.paisSedeRepository.deleteById(id);
  }
}
