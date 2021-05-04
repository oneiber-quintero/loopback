import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {BaseDeDatosDataSource} from '../datasources';
import {Grupo, GrupoRelations, Copa, Equipo} from '../models';
import {CopaRepository} from './copa.repository';
import {EquipoRepository} from './equipo.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly grupoCopa: BelongsToAccessor<Copa, typeof Grupo.prototype.id>;

  public readonly equipos: HasManyRepositoryFactory<Equipo, typeof Grupo.prototype.id>;

  constructor(
    @inject('datasources.baseDeDatos') dataSource: BaseDeDatosDataSource, @repository.getter('CopaRepository') protected copaRepositoryGetter: Getter<CopaRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Grupo, dataSource);
    this.equipos = this.createHasManyRepositoryFactoryFor('equipos', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.grupoCopa = this.createBelongsToAccessorFor('grupoCopa', copaRepositoryGetter,);
    this.registerInclusionResolver('grupoCopa', this.grupoCopa.inclusionResolver);
  }
}
