class Age {
  calculateAge(birthdate: Date) {
    const [birthDay, birthMonth, birthYear] = birthdate.toString().split('/');

    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    let age = currentYear - Number(birthYear);

    if (currentMonth < Number(birthMonth) - 1) age--;

    if (Number(birthMonth) - 1 === currentMonth && Number(currentDay) < Number(birthDay)) age--;

    return age;
  }
}

export { Age };
