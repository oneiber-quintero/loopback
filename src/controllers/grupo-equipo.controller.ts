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
  Grupo,
  Equipo,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoEquipoController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Array of Grupo has many Equipo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Equipo>,
  ): Promise<Equipo[]> {
    return this.grupoRepository.equipos(id).find(filter);
  }

  @post('/grupos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipoInGrupo',
            exclude: ['id'],
            optional: ['grupoId']
          }),
        },
      },
    }) equipo: Omit<Equipo, 'id'>,
  ): Promise<Equipo> {
    return this.grupoRepository.equipos(id).create(equipo);
  }

  @patch('/grupos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Grupo.Equipo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {partial: true}),
        },
      },
    })
    equipo: Partial<Equipo>,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.grupoRepository.equipos(id).patch(equipo, where);
  }

  @del('/grupos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Grupo.Equipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.grupoRepository.equipos(id).delete(where);
  }
}
