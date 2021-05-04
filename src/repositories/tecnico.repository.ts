import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BaseDeDatosDataSource} from '../datasources';
import {Tecnico, TecnicoRelations} from '../models';

export class TecnicoRepository extends DefaultCrudRepository<
  Tecnico,
  typeof Tecnico.prototype.id,
  TecnicoRelations
> {

  constructor(
    @inject('datasources.baseDeDatos') dataSource: BaseDeDatosDataSource,
  ) {
    super(Tecnico, dataSource);
  }
}
