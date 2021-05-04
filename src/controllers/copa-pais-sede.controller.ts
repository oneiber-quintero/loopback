import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Copa,
  PaisSede,
} from '../models';
import {CopaRepository} from '../repositories';

export class CopaPaisSedeController {
  constructor(
    @repository(CopaRepository) protected copaRepository: CopaRepository,
  ) { }

  @get('/copas/{id}/pais-sedes', {
    responses: {
      '200': {
        description: 'Array of Copa has many PaisSede',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaisSede)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PaisSede>,
  ): Promise<PaisSede[]> {
    return this.copaRepository.paisSedes(id).find(filter);
  }

  @post('/copas/{id}/pais-sedes', {
    responses: {
      '200': {
        description: 'Copa model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaisSede)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Copa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaisSede, {
            title: 'NewPaisSedeInCopa',
            exclude: ['id'],
            optional: ['copaId']
          }),
        },
      },
    }) paisSede: Omit<PaisSede, 'id'>,
  ): Promise<PaisSede> {
    return this.copaRepository.paisSedes(id).create(paisSede);
  }

  @patch('/copas/{id}/pais-sedes', {
    responses: {
      '200': {
        description: 'Copa.PaisSede PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaisSede, {partial: true}),
        },
      },
    })
    paisSede: Partial<PaisSede>,
    @param.query.object('where', getWhereSchemaFor(PaisSede)) where?: Where<PaisSede>,
  ): Promise<Count> {
    return this.copaRepository.paisSedes(id).patch(paisSede, where);
  }

  @del('/copas/{id}/pais-sedes', {
    responses: {
      '200': {
        description: 'Copa.PaisSede DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PaisSede)) where?: Where<PaisSede>,
  ): Promise<Count> {
    return this.copaRepository.paisSedes(id).delete(where);
  }
}
