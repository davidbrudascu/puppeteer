@ECHO Updating all NPM packages to the latest versions from their "wanted" specification and checking there are no outdated packages, including outdated vs. their "wanted" specification

CD /D "%WORKSPACE%\AutomatedTests" || EXIT /B 86
CALL npm.cmd install || EXIT /B 86

@ECHO Running tests
CD /D "%WORKSPACE%\AutomatedTests\config" || EXIT /B 86
$Env:BASEURL = "http://%p_TargetHEnvId%/FintechOS_Env_%p_TargetLEnvId%" || EXIT /B 86
CALL npx.cmd codeceptjs run|| EXIT /B 86