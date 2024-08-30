// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sha2::{Digest, Sha256};
use tauri::{command, regex::Regex, Manager};

#[command]
async fn get_binary_hash(file_path: String) -> Result<String, String> {
    let file_data = match std::fs::read(&file_path) {
        Ok(data) => data,
        Err(e) => return Err(format!("Error reading file: {}", e)),
    };

    let mut hasher = Sha256::new();
    hasher.update(file_data);
    let hash = hasher.finalize();
    let hash_hex = hash
        .iter()
        .map(|byte| format!("{:02x}", byte))
        .collect::<String>();

    Ok(hash_hex)
}

fn main() {
    let auth_regex = Regex::new(r"demeter://auth:(.*)$").expect("Failed to compile regex");

    tauri_plugin_deep_link::prepare("localhost");

    tauri::Builder::default()
        .setup(move |app| {
            let window = app.get_window("main").expect("Failed to get window");

            tauri_plugin_deep_link::register("demeter", move |req| {
                if let Err(e) = window.set_focus() {
                    eprintln!("Error setting focus to window: {:?}", e);
                    return;
                }

                if let Some(captures) = auth_regex.captures(req.as_str()) {
                    if let Some(result) = captures.get(1) {
                        let js_code =
                            format!("window.location.hash = 'login:{}';", result.as_str());

                        if let Err(e) = window.eval(&js_code) {
                            eprintln!("Error setting hash in window location: {:?}", e);
                        } else {
                            println!("Successfully set hash in window location.");
                        }
                    }
                } else {
                    eprintln!("Regex pattern did not match the request URL: {:?}", req);
                }
            })
            .expect("Failed to register deep link");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_binary_hash])
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");
}
