monthes = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

endings = ['st', 'nd', 'rd'] + 17 * ['th'] + ['st', 'nd', 'rd'] + 7  * ['th'] + ['st', 'nd', 'rd']

year_number = raw_input('Year:')
month_number = raw_input('Month(1-12):')
day_number = raw_input('Day(1-31):')

month_name = monthes[int(month_number) - 1]
day_name = day_number + endings[int(day_number) - 1]

print month_name + ' ' + day_name + ',' + year_number                                     
