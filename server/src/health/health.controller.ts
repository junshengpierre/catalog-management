import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  DNSHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.dns.pingCheck(
          'Catalog Management',
          // INFO: We want Healthcheck endpoint to be at server
          // root path but there is currently no way to do it with
          // Terminus v7 when using `setGlobalPrefix`. Settled for Healthcheck
          // endpoint to be at `/api/health`

          // TODO: Downgrade to Terminus v6 or wait until config
          // to exclude paths with `setGlobalPrefix` is available.
          // Ref: https://github.com/nestjs/nest/issues/963
          `${process.env.DOMAIN_URI}/api`,
        ),
    ]);
  }
}
