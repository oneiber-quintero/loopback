import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {BaseDeDatosDataSource} from '../datasources';
import {Equipo, EquipoRelations, Grupo} from '../models';
import {GrupoRepository} from './grupo.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {

  public readonly equipoGrupo: BelongsToAccessor<Grupo, typeof Equipo.prototype.id>;

  constructor(
    @inject('datasources.baseDeDatos') dataSource: BaseDeDatosDataSource, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(Equipo, dataSource);
    this.equipoGrupo = this.createBelongsToAccessorFor('equipoGrupo', grupoRepositoryGetter,);
    this.registerInclusionResolver('equipoGrupo', this.equipoGrupo.inclusionResolver);
  }
}
