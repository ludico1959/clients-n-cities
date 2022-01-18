import moment from 'moment';

class GetAge {
  calculateAge(birthdate: string) {
    let date = birthdate;

    date = moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');

    date = moment(date, 'DD/MM/YYYY').toISOString();

    const age = moment().diff(date, 'years');

    return age;
  }
}

export { GetAge };
