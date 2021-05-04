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
  Grupo,
} from '../models';
import {CopaRepository} from '../repositories';

export class CopaGrupoController {
  constructor(
    @repository(CopaRepository) protected copaRepository: CopaRepository,
  ) { }

  @get('/copas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Copa has many Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.copaRepository.grupos(id).find(filter);
  }

  @post('/copas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Copa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Copa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInCopa',
            exclude: ['id'],
            optional: ['copaId']
          }),
        },
      },
    }) grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.copaRepository.grupos(id).create(grupo);
  }

  @patch('/copas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Copa.Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Partial<Grupo>,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.copaRepository.grupos(id).patch(grupo, where);
  }

  @del('/copas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Copa.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.copaRepository.grupos(id).delete(where);
  }
}
