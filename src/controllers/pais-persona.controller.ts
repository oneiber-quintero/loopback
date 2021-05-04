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
  Pais,
  Persona,
} from '../models';
import {PaisRepository} from '../repositories';

export class PaisPersonaController {
  constructor(
    @repository(PaisRepository) protected paisRepository: PaisRepository,
  ) { }

  @get('/pais/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Pais has many Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.paisRepository.paisPersona(id).find(filter);
  }

  @post('/pais/{id}/personas', {
    responses: {
      '200': {
        description: 'Pais model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pais.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInPais',
            exclude: ['id'],
            optional: ['paisId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.paisRepository.paisPersona(id).create(persona);
  }

  @patch('/pais/{id}/personas', {
    responses: {
      '200': {
        description: 'Pais.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.paisRepository.paisPersona(id).patch(persona, where);
  }

  @del('/pais/{id}/personas', {
    responses: {
      '200': {
        description: 'Pais.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.paisRepository.paisPersona(id).delete(where);
  }
}
