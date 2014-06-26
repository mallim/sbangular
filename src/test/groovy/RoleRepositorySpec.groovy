import org.sbangular.Application
import org.sbangular.RepositoryTestCategory
import org.sbangular.domain.Role
import org.sbangular.domain.RoleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.IntegrationTest
import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification

@ContextConfiguration (classes = Application, loader = SpringApplicationContextLoader)
@IntegrationTest
@org.junit.experimental.categories.Category(RepositoryTestCategory.class)
class RoleRepositorySpec extends Specification {

    @Autowired
    RoleRepository dao

    def "test get invalid role"() {
        when:
        def role = dao.findByName("badrolename")
        then:
        assert role == null
    }

    def "test get valid role"(){
        when:
        def role = dao.findByName(Application.USER_ROLE)
        then:
        assert role != null
    }

    def "test update role"(){
        when:
        def role = dao.findByName(Application.USER_ROLE)
        role.setDescription("test descr")
        dao.save(role)
        then:
        def role2 = dao.findByName(Application.USER_ROLE)
        assert role2.description == "test descr"
    }

    def "test add and remove role"(){
        when:
        def role = new Role("testrole")
        role.description = "new role descr"
        dao.save( role )
        and:
        def role2 = dao.findByName("testrole")
        assert role.description != null
        then:
        dao.deleteByName("testrole")
        and:
        def role3 = dao.findByName("testrole")
        assert role3 == null
    }
}
