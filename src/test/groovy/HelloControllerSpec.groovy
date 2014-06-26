

import org.sbangular.Application
import org.sbangular.MustRunFirst
import org.springframework.boot.test.IntegrationTest
import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification

/**
 * This declaration style is based on
 * https://github.com/mkuthan/example-spring-boot
 */
@ContextConfiguration (classes = Application, loader = SpringApplicationContextLoader)
@IntegrationTest
@org.junit.experimental.categories.Category(MustRunFirst.class)
class HelloControllerSpec extends Specification{

    void "testing spock works"(){
        expect:
        true
    }

}