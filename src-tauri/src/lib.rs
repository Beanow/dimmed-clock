use tauri_plugin_updater::UpdaterExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.plugin(tauri_plugin_opener::init())
		.plugin(tauri_plugin_updater::Builder::new().build())
		.setup(|app| {
			// Only AppImages update themselves, deb/rpm are left to the package manager.
			if std::env::var_os("APPIMAGE").is_some() {
				let handle = app.handle().clone();
				tauri::async_runtime::spawn(async move {
					if let Err(err) = update(handle).await {
						eprintln!("update failed: {err}");
					}
				});
			}
			Ok(())
		})
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

// Installs silently, the new version is used on next launch.
async fn update(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
	if let Some(update) = app.updater()?.check().await? {
		update.download_and_install(|_, _| {}, || {}).await?;
	}
	Ok(())
}
