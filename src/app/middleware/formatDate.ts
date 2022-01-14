import moment from 'moment';

class FormatDate {
  formatDateToRequest(date: Date) {
    return moment(date, 'YYYY-MM-DD').utc().format('DD/MM/YYYY');
  }
}

export { FormatDate };
