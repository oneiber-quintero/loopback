import {Entity, model, property} from '@loopback/repository';

@model({name: 'tecnico'})
export class Tecnico extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  personaId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Tecnico>) {
    super(data);
  }
}

export interface TecnicoRelations {
  // describe navigational properties here
}

export type TecnicoWithRelations = Tecnico & TecnicoRelations;
