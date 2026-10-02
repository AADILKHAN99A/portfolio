import 'package:flutter/foundation.dart';
import 'package:portfolio/data/models/project_model.dart';
import 'package:portfolio/data/services/remote_config_service.dart';
import 'package:portfolio/data/services/storage_service.dart';

abstract class PortfolioRepository {
  Future<List<Project>> getProjects();
  String getResumeLink();
  String getResumeImageLink();
}

class PortfolioRepositoryImpl implements PortfolioRepository {
  PortfolioRepositoryImpl({
    required RemoteConfigService remoteConfigService,
    required StorageService storageService,
  })  : _remoteConfigService = remoteConfigService,
        _storageService = storageService;

  final RemoteConfigService _remoteConfigService;
  final StorageService _storageService;

  @override
  String getResumeLink() => _remoteConfigService.resumeLink;

  @override
  String getResumeImageLink() => _remoteConfigService.resumeImageLink;

  @override
  Future<List<Project>> getProjects() async {
    try {
      final rawJson = _remoteConfigService.projectsRawJson;
      if (rawJson.trim().isEmpty) {
        return [];
      }

      final parsed = Projects.fromRawJson(rawJson);
      final resolvedProjects = <Project>[];

      for (final project in parsed.projects) {
        final updatedImages = <String>[];

        for (int i = 0; i < project.responsiveImages.length; i++) {
          final imgNum = (i + 1).toString();
          final url = await _storageService.getProjectImageUrl(
            projectName: project.mainImage,
            imageName: imgNum,
          );
          if (url != null && url.isNotEmpty) {
            updatedImages.add(url);
          } else {
            updatedImages.add(project.responsiveImages[i]);
          }
        }

        resolvedProjects.add(
          project.copyWith(responsiveImages: updatedImages),
        );
      }

      return resolvedProjects;
    } catch (e) {
      debugPrint('PortfolioRepositoryImpl getProjects error: $e');
      return [];
    }
  }
}
