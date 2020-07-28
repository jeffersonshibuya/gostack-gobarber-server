import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month } = request.body;

    const listProviderMonthAvailatility = container.resolve(
      ListProviderMonthAvailability,
    );

    const availability = await listProviderMonthAvailatility.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
