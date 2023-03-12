
import { Divider, Typography, Box, Grid, TextField, FormControlLabel, Checkbox, Button, Link } from "@mui/material/";
import styles from '@/styles/Home.module.css';

export default function login() {

    return (


        <Box
            sx={{
                width: "35%",
                height: "35%",
                marginTop: "5%",
                ml: "35%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: "white",
                borderRadius: "50px",
                marginBottom: "5%"
            }}>
            <Box sx={{
                margin: 3,
                display: 'flex',
                flexDirection: 'row',
            }}>

               

                    <img
                        sx={{ mt: 5, flexGrow: 1, objectFit: "contain", alignItems: "end" }}
                        component="img"
                        height="100"
                        src="/npca.png"

                    />

            </Box>


            <Box
                sx={{
                    margin: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>

                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label={<Typography fontSize="medium" color="black">I accept the &nbsp;
                                    <Link href="./login" >
                                        Terms of Service
                                    </Link> &nbsp;and the&nbsp; <Link href="./login" >
                                        Privacy Policy
                                    </Link> &nbsp;of this page.</Typography>}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        href="./login"
                    >
                        Sign Up
                    </Button>

                    <Divider sx={{ height: 0.1, width: 1, backgroundColor: "background.main" }} />
                    <Button
                        onClick={() => signIn()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        href="./login"
                    >
                        Create an Account
                    </Button>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            // backgroundColor: 'primary.light',
                        }}></Box>
                </Box>
            </Box>

        </Box>

    )
}
