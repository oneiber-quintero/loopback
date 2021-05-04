import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Copa} from './copa.model';
import {Equipo} from './equipo.model';

@model({name: 'grupo'})
export class Grupo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  zona?: string;

  @belongsTo(() => Copa, {name: 'grupoCopa'})
  copaId: number;

  @hasMany(() => Equipo)
  equipos: Equipo[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
