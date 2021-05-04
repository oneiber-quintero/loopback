import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Grupo} from './grupo.model';

@model({name: 'equipo'})
export class Equipo extends Entity {
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
  apodo: string;

  @belongsTo(() => Grupo, {name: 'equipoGrupo'})
  grupoId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
