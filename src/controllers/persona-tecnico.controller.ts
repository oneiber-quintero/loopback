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
  Persona,
  Tecnico,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaTecnicoController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/tecnico', {
    responses: {
      '200': {
        description: 'Persona has one Tecnico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tecnico),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tecnico>,
  ): Promise<Tecnico> {
    return this.personaRepository.personaTecnico(id).get(filter);
  }

  @post('/personas/{id}/tecnico', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tecnico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tecnico, {
            title: 'NewTecnicoInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) tecnico: Omit<Tecnico, 'id'>,
  ): Promise<Tecnico> {
    return this.personaRepository.personaTecnico(id).create(tecnico);
  }

  @patch('/personas/{id}/tecnico', {
    responses: {
      '200': {
        description: 'Persona.Tecnico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tecnico, {partial: true}),
        },
      },
    })
    tecnico: Partial<Tecnico>,
    @param.query.object('where', getWhereSchemaFor(Tecnico)) where?: Where<Tecnico>,
  ): Promise<Count> {
    return this.personaRepository.personaTecnico(id).patch(tecnico, where);
  }

  @del('/personas/{id}/tecnico', {
    responses: {
      '200': {
        description: 'Persona.Tecnico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tecnico)) where?: Where<Tecnico>,
  ): Promise<Count> {
    return this.personaRepository.personaTecnico(id).delete(where);
  }
}
