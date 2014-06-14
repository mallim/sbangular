package base

import org.sbangular.Application
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.transaction.TransactionConfiguration
import org.springframework.transaction.annotation.Transactional
import spock.lang.Specification

@Transactional
@TransactionConfiguration(defaultRollback = true)
abstract class IntegrationSpec extends Specification {
}
