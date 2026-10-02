import 'package:firebase_core/firebase_core.dart';
import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/theme/app_theme.dart';
import 'package:portfolio/data/repositories/contact_repository.dart';
import 'package:portfolio/data/repositories/portfolio_repository.dart';
import 'package:portfolio/data/services/firestore_service.dart';
import 'package:portfolio/data/services/remote_config_service.dart';
import 'package:portfolio/data/services/storage_service.dart';
import 'package:portfolio/firebase_options.dart';
import 'package:portfolio/features/portfolio/view_models/portfolio_view_model.dart';
import 'package:portfolio/features/shell/view_models/shell_view_model.dart';
import 'package:portfolio/features/splash/views/splash_view.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  final remoteConfigService = RemoteConfigService();
  await remoteConfigService.initialize();

  final firestoreService = FirestoreService();
  final storageService = StorageService();

  final portfolioRepository = PortfolioRepositoryImpl(
    remoteConfigService: remoteConfigService,
    storageService: storageService,
  );

  final contactRepository = ContactRepositoryImpl(
    firestoreService: firestoreService,
  );

  runApp(
    MultiProvider(
      providers: [
        Provider<RemoteConfigService>.value(value: remoteConfigService),
        Provider<FirestoreService>.value(value: firestoreService),
        Provider<StorageService>.value(value: storageService),
        Provider<PortfolioRepository>.value(value: portfolioRepository),
        Provider<ContactRepository>.value(value: contactRepository),
        ChangeNotifierProvider(
          create: (_) => PortfolioViewModel(repository: portfolioRepository),
        ),
        ChangeNotifierProvider(
          create: (_) => ShellViewModel(),
        ),
      ],
      child: const PortfolioApp(),
    ),
  );
}

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aadil Khan | Portfolio',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const SplashView(),
    );
  }
}
