package org.sbangular.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by User on 22/5/2014.
 */
public interface RoleRepository extends CrudRepository<Role, Long> {

    Role findByName(String name);

    @Modifying
    @Transactional
    @Query("delete from Role r where r.name = :name")
    void deleteByName(@Param("name") String name);

}
