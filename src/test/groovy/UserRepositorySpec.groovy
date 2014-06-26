import org.sbangular.Application
import org.sbangular.RepositoryTestCategory
import org.sbangular.domain.RoleRepository
import org.sbangular.domain.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.IntegrationTest
import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification

@ContextConfiguration (classes = Application, loader = SpringApplicationContextLoader)
@IntegrationTest
@org.junit.experimental.categories.Category(RepositoryTestCategory.class)
class UserRepositorySpec extends Specification {

    @Autowired
    RoleRepository roleDao

    @Autowired
    UserRepository dao

    def "test get invalid user"() {
        when:
        def user = dao.findOne(1000L)
        then:
        assert user == null
    }

    def "test get user"(){
        when:
        def user = dao.findOne(-1L)
        then:
        assert user != null
        assert user.roles.size() == 1
        assert user.enabled == true
    }

    def "test get user password"(){
        when:
        def user = dao.findOne(-1L)
        and:
        def password = dao.getUserPassword(user.getId())
        then:
        assert password != null
    }
}
