import 'package:flutter_test/flutter_test.dart';
import 'package:portfolio/data/models/project_model.dart';

void main() {
  group('Project Model Serialization Tests', () {
    test('Project model parses valid JSON correctly', () {
      final jsonMap = {
        'name': 'Test Project',
        'description': 'A sample test project description',
        'technology': 'Flutter, Dart, Firebase',
        'main_image': 'sample_project',
        'responsiveImages': ['img1.png', 'img2.png'],
        'github': 'https://github.com/example/test',
        'direction': 'left',
      };

      final project = Project.fromJson(jsonMap);

      expect(project.name, equals('Test Project'));
      expect(project.description, equals('A sample test project description'));
      expect(project.technology, equals('Flutter, Dart, Firebase'));
      expect(project.mainImage, equals('sample_project'));
      expect(project.responsiveImages, equals(['img1.png', 'img2.png']));
      expect(project.github, equals('https://github.com/example/test'));
      expect(project.direction, equals('left'));
    });

    test('Projects container parses list of projects correctly', () {
      final jsonMap = {
        'projects': [
          {
            'name': 'App 1',
            'description': 'Description 1',
            'technology': 'Flutter',
            'main_image': 'app_1',
            'responsiveImages': ['1.png'],
            'github': 'https://github.com/example/app1',
            'direction': 'left',
          },
          {
            'name': 'App 2',
            'description': 'Description 2',
            'technology': 'Dart',
            'main_image': 'app_2',
            'responsiveImages': ['2.png'],
            'github': 'https://github.com/example/app2',
            'direction': 'right',
          },
        ]
      };

      final projects = Projects.fromJson(jsonMap);
      expect(projects.projects.length, equals(2));
      expect(projects.projects[0].name, equals('App 1'));
      expect(projects.projects[1].name, equals('App 2'));
    });
  });
}
