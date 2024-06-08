import csv
from django.core.management.base import BaseCommand
from ...models import City, Country

class Command(BaseCommand):
    help = 'Import data from world cities CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']
        try:
            with open(csv_file_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    country_name = row['country']
                    city_name = row['city']

                    if not country_name or not city_name:
                        self.stdout.write(self.style.ERROR('Invalid row: missing country or city'))
                        continue

                    # Проверка на существующую страну
                    country, created = Country.objects.get_or_create(name=country_name)
                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Country "{country_name}" created successfully'))

                    # Проверка на существующий город в указанной стране
                    city, created = City.objects.get_or_create(name=city_name, country=country)
                    if created:
                        self.stdout.write(self.style.SUCCESS(f'City "{city_name}" in country "{country_name}" created successfully'))

            self.stdout.write(self.style.SUCCESS('Data imported successfully'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))