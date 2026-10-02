import 'dart:convert';

class Projects {
  final List<Project> projects;

  const Projects({required this.projects});

  factory Projects.fromRawJson(String str) =>
      Projects.fromJson(json.decode(str) as Map<String, dynamic>);

  String toRawJson() => json.encode(toJson());

  factory Projects.fromJson(Map<String, dynamic> json) {
    final list = json['projects'] as List<dynamic>? ?? [];
    return Projects(
      projects: list
          .map((item) => Project.fromJson(item as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
        'projects': projects.map((x) => x.toJson()).toList(),
      };
}

class Project {
  final String name;
  final String description;
  final String technology;
  final String mainImage;
  final List<String> responsiveImages;
  final String github;
  final String direction;

  const Project({
    required this.name,
    required this.description,
    required this.technology,
    required this.mainImage,
    required this.responsiveImages,
    required this.github,
    required this.direction,
  });

  factory Project.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'name': final String name,
        'description': final String description,
        'technology': final String technology,
        'main_image': final String mainImage,
        'responsiveImages': final List<dynamic> images,
        'github': final String github,
        'direction': final String direction,
      } =>
        Project(
          name: name,
          description: description,
          technology: technology,
          mainImage: mainImage,
          responsiveImages: List<String>.from(images),
          github: github,
          direction: direction,
        ),
      _ => Project(
          name: (json['name'] as String?) ?? '',
          description: (json['description'] as String?) ?? '',
          technology: (json['technology'] as String?) ?? '',
          mainImage: (json['main_image'] as String?) ?? '',
          responsiveImages: json['responsiveImages'] != null
              ? List<String>.from(json['responsiveImages'] as List<dynamic>)
              : <String>[],
          github: (json['github'] as String?) ?? '',
          direction: (json['direction'] as String?) ?? 'left',
        ),
    };
  }

  Map<String, dynamic> toJson() => {
        'name': name,
        'description': description,
        'technology': technology,
        'main_image': mainImage,
        'responsiveImages': responsiveImages,
        'github': github,
        'direction': direction,
      };

  Project copyWith({
    String? name,
    String? description,
    String? technology,
    String? mainImage,
    List<String>? responsiveImages,
    String? github,
    String? direction,
  }) {
    return Project(
      name: name ?? this.name,
      description: description ?? this.description,
      technology: technology ?? this.technology,
      mainImage: mainImage ?? this.mainImage,
      responsiveImages: responsiveImages ?? List<String>.from(this.responsiveImages),
      github: github ?? this.github,
      direction: direction ?? this.direction,
    );
  }
}
