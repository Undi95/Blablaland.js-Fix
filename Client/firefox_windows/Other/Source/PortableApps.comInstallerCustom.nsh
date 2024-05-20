;!include NewTextReplace.nsh
;!include ReplaceInFileWithTextReplace.nsh

!macro CustomCodePreInstall
	${If} ${FileExists} "$INSTDIR\Data\profile\*.*"
		ReadINIStr $0 "$INSTDIR\App\AppInfo\appinfo.ini" "Version" "PackageVersion"
		${VersionCompare} $0 "20.0.0.0" $R0
		${If} $R0 == 2
			WriteINIStr "$INSTDIR\Data\settings\FirefoxPortableSettings.ini" "FirefoxPortableSettings" "SubmitCrashReport" "0"
		${EndIf}
		;${VersionCompare} $0 "61.0.0.0" $R0
		;${If} $R0 == 2
		;	${ReplaceInFile} "$INSTDIR\Data\profile\prefs.js" `user_pref("browser.cache.disk.capacity", 0);` `user_pref("browser.cache.disk.enable", false);`
		;${EndIf}
	${EndIf}
!macroend
