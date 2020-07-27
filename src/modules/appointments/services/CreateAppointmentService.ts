import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepsitory from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepsitory,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now()))
      throw new AppError("You can't schedule in a past date");

    if (provider_id === user_id)
      throw new AppError(`you can't create an appoint with yourself`);

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError(`you can only create an appoint between 8am and 5pm`);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
